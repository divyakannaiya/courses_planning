const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const { connectToDatabase ,closeDatabase} = require('../../database');


// let token,tokenValue;
beforeAll(async () => {
   await connectToDatabase()
});
afterAll(async () => {
  await closeDatabase();
});

//Create

describe('Api response for company controller', () => {
  it('should respond with a 400 validate the companyName', async () => {
   const response = await request(app).post('/api/company')
   .send({ "companyName": "" })
   expect(response.statusCode).toBe(400);
   expect(response.body.error).toBe("please enter a valid companyName");
  })

  it('should respond with a 400 validate the addressLine1', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid addressLine1");
  })

  it('should respond with a 400 validate the addressLine2', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid addressLine2");
  })

  it('should respond with a 400 validate the country', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "cc","country": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid country");
  })

  it('should respond with a 400 validate the city', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "cc","country": "dd","city": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid city");
  })

  it('should respond with a 400 validate the state', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "cc","country": "dd","city": "ee","state": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid state");
  })

  it('should respond with a 400 validate the area', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "cc","country": "dd","city": "ee","state": "ff"," area": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid area");
  })

  it('should respond with a 400 validate the pincode', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "cc","country": "dd","city": "ee","state": "ff","area": "gg"," pincode": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid pincode");
  })

  it('should respond with a 400 validate the companyEmail', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "cc","country": "dd","city": "ee","state": "ff","area": "gg","pincode": "hh","companyEmail": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid companyEmail");
  })

  it('should respond with a 400 validate the courseId', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "cc","country": "dd","city": "ee","state": "ff","area": "gg","pincode": "hh","companyEmail": "ii","courseId": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid courseId");
  })

  it('should respond with a 400 validate the phoneNo', async () => {
    const response = await request(app).post('/api/company')
    .send({ "companyName": "aa","addressLine1": "bb","addressLine2": "cc","country": "dd","city": "ee","state": "ff","area": "gg","pincode": "hh","companyEmail": "ii","courseId": "jj","phoneNo": "" })
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("please enter a valid phoneNo");
  })

  
  describe("Should be response createCompany", () => {
    it("should be 400 response for createCompany", async () => {
      const response = await request(app).post(`/api/company`);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Company not created sucessfully");
    })
  })


  // describe("Should be response Company", () => {
  //   it("should be 200 response for Company", async () => {
  //     const response = await request(app).post(`/api/company`);
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.message).toBe("Company saved sucessfully");
  //   })
  // })

  









});



