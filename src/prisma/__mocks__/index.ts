const prismaClient = {
  movie: {
    findFirst: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  character: {
    create: jest.fn(),
  },
  tvShow: {
    delete: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
};

export default prismaClient;
