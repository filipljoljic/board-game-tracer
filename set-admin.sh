#!/bin/bash

# Script to set a user as admin in the board game tracker database
# Usage: ./set-admin.sh your@email.com
# Or: ./set-admin.sh your_username

if [ -z "$1" ]; then
  echo "Usage: $0 <email_or_username>"
  echo "Example: $0 your@email.com"
  echo "Example: $0 your_username"
  exit 1
fi

USER_IDENTIFIER="$1"

# Try to update by email first, then by username
npx prisma db execute --stdin <<EOF
UPDATE "User" 
SET "isAdmin" = true 
WHERE email = '$USER_IDENTIFIER' OR username = '$USER_IDENTIFIER';
EOF

echo "✓ Successfully set user '$USER_IDENTIFIER' as admin"
echo ""
echo "To verify, run: npx prisma studio"
echo "Then check the 'isAdmin' field for your user"
