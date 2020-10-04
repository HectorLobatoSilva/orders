import React, { useEffect, useState } from 'react'
import { Collapse, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Body = () => {
    const [ orders, setOrders ] = useState([])

    const getOrders = async ( ) => {
        const url = "/reports"
        const data = await ( await fetch( url ) ).json()
        return data.orders
    }

    useEffect( () => {
        const loadOrders = async ( ) => {
            const newOrders = await getOrders()
            setOrders([...newOrders.orders])
        }
        loadOrders()
    }, [] )
    return (
        <div>
            <Container style = { { paddingTop: "3em" } } >
                <Typography variant = "h4">ORDERS</Typography>
                <TableContainer component = { Paper }>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align = "left" > ID </TableCell>
                                <TableCell align = "right" > Price </TableCell>
                                <TableCell align = "right" > Shipping </TableCell>
                                <TableCell align = "right" > Total </TableCell>
                                <TableCell align = "right" > Products </TableCell>
                                <TableCell align = "right" > Details </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders.length > 0 && orders.map( ( order, key ) => <Row key = { key } order = { order } /> )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

const Row = ( { order } ) => {
    console.log(order)
    const [ open, setOpen ] = useState(false)
    const handleSetOnClick = () => {
        setOpen( !open )
    }
    return (
        <React.Fragment>
            <TableRow>
                <TableCell align = "left" > { order.id } </TableCell>
                <TableCell align = "right" > ${ parseFloat(order.total_products).toFixed(2) } </TableCell>
                <TableCell align = "right" > ${ parseFloat(order.total_shipping_tax_incl).toFixed(2) } </TableCell>
                <TableCell align = "right" > ${ parseFloat(order.total_paid).toFixed(2) } </TableCell>
                <TableCell align = "right" > { order.associations.order_rows.length } </TableCell>
                <TableCell align = "right" > <IconButton onClick = {handleSetOnClick} > <ExpandMoreIcon/> </IconButton> </TableCell>
            </TableRow>
            <TableRow style = { { backgroundColor: "rgba(224, 242, 252, 0.5)", fontSize: "12pt" } }>
                <TableCell style = { { paddingBottom: 0, paddingTop: 0 } } colSpan = { 6 }>
                    <Collapse in = { open } timeout = "auto" unmountOnExit>
                        {
                            order.associations.order_rows.map( product => <div key = { product.product_id } 
                            style = { { display: "flex", justifyContent: "space-between", width: "60%", padding: "1.5em" } } >
                                <Typography> {product.product_name} </Typography>
                                <Typography> ${parseFloat(product.product_price).toFixed(2)} </Typography>
                            </div> )
                        }
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default Body