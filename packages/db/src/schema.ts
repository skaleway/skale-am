import {
  bigint,
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import {
  account,
  rateLimitAttempts,
  session,
  user,
  verification,
} from "./auth";

export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  metadata: jsonb("metadata"),
  lastUsed: boolean("last_used").default(false),
  repoUrl: text("repo_url").notNull().default(""),
  repoPath: text("repo_path").notNull().default(""),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  storageLimit: bigint("storage_limit", { mode: "number" })
    .notNull()
    .default(100 * 1024 * 1024),
  storageUsed: bigint("storage_used", { mode: "number" }).notNull().default(0),
});

export const member = pgTable(
  "member",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [unique().on(table.id, table.organizationId)]
);

export const team = pgTable("team", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const invitation = pgTable("invitation", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references(() => member.id, { onDelete: "cascade" }),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  status: text("status").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  teamId: text("team_id").references(() => team.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const invitationRelations = relations(invitation, ({ one }) => ({
  organization: one(organization, {
    fields: [invitation.organizationId],
    references: [organization.id],
  }),
  inviter: one(member, {
    fields: [invitation.inviterId],
    references: [member.id],
  }),
}));

export const teamMember = pgTable("team_member", {
  id: text("id").primaryKey(),
  teamId: text("team_id")
    .notNull()
    .references(() => team.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const organizationRole = pgTable("organization_role", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  permissions: jsonb("permissions").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const schema = {
  user,
  account,
  session,
  verification,
  rateLimitAttempts,
  organization,
  member,
  invitation,
  team,
  teamMember,
  organizationRole,
  invitationRelations,
};

export default schema;

export { rateLimitAttempts, user } from "./auth";
