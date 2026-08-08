export type Session = {
  id: string;
  name: string;
  role: "student" | "admin";
  permissions: string[];
};

export function getSession(): Session {
  return {
    id: "user-1",
    name: "Anderson",
    role: "student",
    permissions: ["products:read", "cart:write"],
  };
}

export function canAccess(session: Session, permission: string) {
  return session.permissions.includes(permission);
}
