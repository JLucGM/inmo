import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        height: '100%', // Agrega una propiedad height al estilo de la página
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        border: 1,
        borderColor: "black",
        marginBottom: 20, // Agrega un margen inferior de 20 puntos
    },
    subtitle: {
        fontSize: 16,
        color: "#000",
    },
    text: {
        fontSize: 12,
        color: "#000",
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20,
        textAlign: 'center',
        fontSize: 10,
    },
});

export default function PDF({ data }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image src={`/img/properties/${data.main}`} alt={data.main} />

                    {/* {data.images.map((image, index) => (
                                <div key={index}>
                                    <div className="border rounded-lg">
                                        <img src={`/img/properties/${image.name}`} alt={image.name} />
                                        
                                    </div>
                                </div>
                            ))} */}

                    <Text style={styles.subtitle}>Datos de la propiedad:</Text>
                    <Text style={styles.text}>N. Identification: {data.identification}</Text>
                    <Text style={styles.text}>Nombre: {data.name}</Text>
                    <Text style={styles.text}>Precio: {data.price}</Text>
                    <Text style={styles.text}>typeproperty: {data.typeproperty.name}</Text>
                    <Text style={styles.text}>bathrooms: {data.bathrooms}</Text>
                    <Text style={styles.text}>bedrooms: {data.bedrooms}</Text>
                    <Text style={styles.text}>garages: {data.garages}</Text>
                    <Text style={styles.text}>totalMeters: {data.totalMeters}mt2</Text>
                    <Text style={styles.text}>builtMeters: {data.builtMeters}mt2</Text>
                    <Text style={styles.text}>Dirección: {data.direction}, {data.country.name}, {data.state.name}, {data.city.name}</Text>
                    <Text style={styles.text}>description: {data.description}</Text>

                    <Text style={styles.subtitle}>Comodidades:</Text>
                    {data.amenities.map((amenity, index) => (
                        <Text key={index} style={styles.text}>{amenity.name}</Text>
                    ))}
                    
                    <Text style={styles.subtitle}>Datos del agente</Text>
                    <Text style={styles.text}>Agente: {data.user.name}</Text>
                    <Text style={styles.text}>email: {data.user.email}</Text>
                    <Text style={styles.text}>phone: {data.user.phone}</Text>
                   
                </View>
                {/* <Text style={styles.footer} render={({pageNumber, totalPages}) => 
                    `${pageNumber}/${totalPages}`
                } fixed /> */}
            </Page>
        </Document>
    );
}