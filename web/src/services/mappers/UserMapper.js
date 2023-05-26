class UserMapper {
  toPersistence(domainUser) {
    return {
      id: domainUser.id,
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser?.password,
      current_password: domainUser?.currentPassword,
      new_password: domainUser?.newPassword,
      confirm_password: domainUser?.confirmPassword,
      admin: domainUser.admin,
      avatar_url: domainUser.avatarUrl,
      token: domainUser?.token,
    };
  }

  toDomain(persistenceUser) {
    return {
      id: persistenceUser.id,
      name: persistenceUser.name,
      email: persistenceUser.email,
      password: persistenceUser?.password,
      admin: persistenceUser.admin,
      avatarUrl: persistenceUser.avatar_url,
      totalRecipes: persistenceUser?.total_recipes,
      token: persistenceUser?.token,
    };
  }
}

export default new UserMapper();
