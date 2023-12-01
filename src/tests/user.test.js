const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const { connectToDatabase ,closeDatabase} = require('../../database');
const { isNull } = require('../service/helper');
const { user } = require('../models/user.schema');
// let token,tokenValue;
beforeAll(async () => {
   await connectToDatabase()
});
afterAll(async () => {
  await closeDatabase();
});

//create

describe('Api response for user controller', () => {
  it('should be 400 response validate with firstname', async () => {
    const response = await request(app).post('/api/user')
    .send({ "firstName": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid name");
  })

  it('should be 400 response validate with username', async () => {
    const response = await request(app).post('/api/user')
    .send({ "firstName": "ff","userName":"" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid userName");
  })

  it('should be 400 response validate with email', async () => {
    const response = await request(app).post('/api/user')
    .send({ "firstName": "ff","userName":"gg","email":"" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid email");
  })

  it('should be 400 response validate with mobileNumber', async () => {
    const response = await request(app).post('/api/user')
   .send({ "firstName": "ff","userName":"gg","email":"hh","mobileNumber":"" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid mobileNumber");
  })

  
  it('should be 400 response validate with usertype', async () => {
    const response = await request(app).post('/api/user')
    .send({ "firstName": "ff","userName":"gg","email":"hh","mobileNumber":"88","usertype":"" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid usertype");
  })

  
  it('should be 400 response validate with active', async () => {
    const response = await request(app).post('/api/user')
    .send({ "firstName": "ff","userName":"gg","email":"hh","mobileNumber":"88","usertype":"ii","active":"" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid active");
  })

  
  it('should be 400 response validate with block', async () => {
    const response = await request(app).post('/api/user')
    .send({ "firstName": "ff","userName":"gg","email":"hh","mobileNumber":"88","usertype":"ii","active":"jj","block":"" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid block");
  })

});

 // describe("Should be create user for  200 response", () => {
  //   it("should be 200 response for user", async () => {
  //     const response = await request(app).post('/api/user').send()
  //     expect(response.statusCode).toBe("200");
  //     expect(response.body.message).toBe("User created successfully")
  //   })
  // })



//get

describe('Api response for user Id controller', () => {
 it('should be 400 response validate with user Id', async () => {
   const id = null;
   const response = await request(app).get(`/api/user/get/${id}`);
   expect(response.statusCode).toBe(400);
   expect(response.body.error).toBe("Select a valid user Id");
 })


  it('should be 400 response validate with user Id', async () => {
   var id ="654868b3517248417943dc6c";
   const response = await request(app).get(`/api/user/get/${id}`);
   expect(response.statusCode).toBe(404);
   expect(response.body.error).toBe("User was not found");
  }) 

  
 // describe("Should be  get user Id 200 response", () => {
 //  it("should be 200 response for user Id controller", async () => {
 //   var id ="654868b3517248417943dc7c";
 //   const response = await request(app).get(`/api/user/get/:id`)
 //   expect(response.statusCode).toBe(200);
 //   expect(response.body.message).toBe("User found successfully");
 //   })
 // })

});

//Getall

describe("Should be  get all user 200 response", () => {
  it("should be 200 response for user controller", async () => {
    const response = await request(app).get(`/api/user`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User done successfully");
  })
})

//Update

describe('Api response for user Id controller', () => {
  it('should be 400 response validate with user Id', async () => {
   const id = null;
   const response = await request(app).put(`/api/user/${id}`);
   expect(response.statusCode).toBe(400);
   expect(response.body.error).toBe("select a valid user id");
  })
  
  it('should be 400 response for id controller ', async () => {
    const id = "654868b3517248417943dc7c";
    const response = await request(app).put(`/api/user/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("edit something to update id");
  })
 
  
  //  it('should be 400 response validate with user Id', async () => {
  //    const id ="654868";
  //    const response = await request(app).put(`/api/user/${id}`);
  //    expect(response.statusCode).toBe(404);
  //    expect(response.body.error).toBe("Requested user was not exists");
  //    }) 
  //  })


 //  it('should be 400 response validate with user Id', async () => {
 //    var id ="654868b3517248417943dc7c";
 //    const response = await request(app).put(`/api/user/${id}`);
 //    expect(response.statusCode).toBe(404);  
 //    expect(response.body.error).toBe("user was not updated. contact site admin");
 //  }) 



 // describe("Should be  update Id 200 response", () => {
 //   it("should be 200 response validate with Id", async () => {
 //     varid ="654868b3517248417943dc3c";
 //     const response = await request(app).put(`/api/user/${id}`);
 //     expect(response.statusCode).toBe(200);
 //     expect(response.body.message).toBe("User updated successfully");
 //     })
 //   })

});

//Delete

describe("Should be  delete id for 400 response", () => {
  it("should be 400 response for Id controller", async () => {
    const id = "67656";
    const response = await request(app).delete(`/api/user/delete/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("select a valid user Id");
  })
});

describe("Should be  delete id for 400 response", () => {
  it("should be 404 response for Id controller", async () => {
    const id = "654868b3517248417943dc7c";
    const response = await request(app).delete(`/api/user/delete/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Requested user was not exists");
  })
});

// describe("Should be  delete id for 406 response", () => {
//   it("should be 406 response for Id controller", async () => {
//     const id = "654868b3517248417943dc7c";
//     const response = await request(app).delete(`/api/user/delete/${id}`);
//     expect(response.statusCode).toBe(406);
//     expect(response.body.error).toBe("Cannot delete user, contact site admin");
//   })
// });

// describe("Should be  delete id for 200 response", () => {
//   it("should be 200 response for id controller", async () => { 
//     const id = "654868b3517248417943dc7c";
//     const response = await request(app).delete(`/api/user/delete/${id}`);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.error).toBe("user deleted successfully");
//   })
// });













 




















  











