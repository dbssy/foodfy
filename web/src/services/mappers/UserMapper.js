class UserMapper {
  toPersistence(domainUser) {
    return {
      id: domainUser.id,
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser?.password,
      admin: domainUser.admin,
      avatar_url: domainUser.avatarUrl,
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
    };
  }
}

export default new UserMapper();
