// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CartContext } from '@/components/CartContext';
import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';
import { loadComponents } from 'next/dist/server/load-components';
import { useContext } from 'react';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  await mongooseConnect();
  const { email, password } = req.body;
  // const { setLoggedInUser } = useContext(CartContext)
  const user = await Client.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  console.log(user);

  // const token = jwt.sign({ userId: user._id }, 'knmenlkj3h423434332432432');
  // localStorage.setItem('token', token);
  // localStorage.setItem('user', user);
  // setLoggedInUser(user);
  if (isPasswordValid)
    res.json(user);

  else
    res.json(false);

}
