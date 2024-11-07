import React from 'react';
import styles from './Layaout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';

export default function Layaout() {
  return <>
  <Navbar></Navbar>
    <Outlet></Outlet>
    
  </>
}
