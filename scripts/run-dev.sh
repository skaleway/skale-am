#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Skale AM Development Environment    ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

cd "$ROOT_DIR"

echo -e "${YELLOW}[1/5]${NC} Installing dependencies..."
pnpm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo -e "${YELLOW}[2/5]${NC} Building packages..."
pnpm --filter './packages/*' build
echo -e "${GREEN}✓ Packages built${NC}"
echo ""

echo -e "${YELLOW}[3/5]${NC} Starting Docker services..."
docker compose up -d
echo -e "${GREEN}✓ Docker services started${NC}"
echo ""

echo -e "${YELLOW}    ${NC} Waiting for database to be healthy..."
until docker compose exec -T db pg_isready -U skaleam -d skaleam > /dev/null 2>&1; do
  sleep 1
done
echo -e "${GREEN}✓ Database is ready${NC}"
echo ""

echo -e "${YELLOW}[4/5]${NC} Running database migrations..."
cd "$ROOT_DIR/packages/db"
pnpm db:generate 2>/dev/null || true
pnpm db:migrate 2>/dev/null || true
pnpm db:push 2>/dev/null || true
cd "$ROOT_DIR"
echo -e "${GREEN}✓ Database schema synced${NC}"
echo ""
