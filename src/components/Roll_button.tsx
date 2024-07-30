import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Roll_button(props: {get_more_products: Function}) {
  

  return (
    <>
        <button onClick={() => props.get_more_products()}>rool</button>
    </>
  );
}