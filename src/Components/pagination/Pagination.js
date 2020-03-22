import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function PagComp({ pagItems, onClick, selectedPag }) {
  const calaPagItem = () => {
    let items = []
    for (let x = 1; x <= pagItems; x++) {
      items.push(
        <Pagination.Item
          key={x}
          active={x === selectedPag}
          onClick={() => onClick(x)}
        >
          {x}
        </Pagination.Item>
      )
    }
    return items
  }
  return <Pagination>{calaPagItem()}</Pagination>
}
