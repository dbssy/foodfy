class UserMapper {
  toPersistence(domainUser) {
    return {
      id: domainUser.id,
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser?.password,
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
      token: persistenceUser?.token,
    };
  }
}

export default new UserMapper();
