/* eslint-disable camelcase */
import React from 'react'
import {Header, Divider, Table} from 'semantic-ui-react'

export default ({description, material, max_watt, bulb_qty, finish, bulb}) => (
  <div>
    <Header as="h3">About this product</Header>
    <p>{description}</p>

    <Divider />

    <Table celled>
      <Table.Header style={{background: '#f9fafb'}}>
        <Table.Row>
          <Table.HeaderCell colSpan="2">Attributes</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Material</Table.Cell>
          <Table.Cell>{material}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Max watt.</Table.Cell>
          <Table.Cell>{max_watt}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Bulb qty.</Table.Cell>
          <Table.Cell>{bulb_qty}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Finish</Table.Cell>
          <Table.Cell>{finish}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Fitting</Table.Cell>
          <Table.Cell>{bulb}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)
