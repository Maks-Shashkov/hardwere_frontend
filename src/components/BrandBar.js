import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Col } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);
    
    return (
        <Row className="d-flex">
            {device.brands.map(brand => (
                <Col xs="auto" key={brand.id}>
                    <Card
                        style={{
                            cursor: 'pointer',
                            width: '110px',
                            textAlign: 'center',
                            borderColor: brand.id === device.selectedBrand?.id ? '#0d6efd' : ''
                        }}
                        className="p-2 mt-3" // Уменьшаем отступ между карточками
                        onClick={() => device.setSelectedBrand(brand)}
                    >
                        {brand.name}
                    </Card>
                </Col>
            ))}
        </Row>
    );
});

export default BrandBar;

