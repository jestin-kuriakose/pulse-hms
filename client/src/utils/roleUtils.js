export const hasRole = (user, allowedRoles) => {
    console.log(user?.role)
    console.log(allowedRoles)
  return user && allowedRoles.includes(user.role);
};
