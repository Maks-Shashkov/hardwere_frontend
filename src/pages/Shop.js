import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/pages";


const Shop = observer(() => {
    
    const {device} = useContext(Context)
    
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])
    
    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])
    
    
    return (
        <div>
            <Container>
                <Row>
                    <Col md={9}>
                        <BrandBar/>
                    </Col>
                    <Col md={9}>
                        <DeviceList/>
                        <Pages/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Shop;