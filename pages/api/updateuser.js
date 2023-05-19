// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';
export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;
  if (method === "POST") {

    const { id, name, email, phoneNum, address } = req.body;
    const res = await Client.updateOne({ _id: req.body.id }, { name, email, phoneNum, address });

    res.josn("success");
  }
}
