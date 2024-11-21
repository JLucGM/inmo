import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // height: 50,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 10,
        // backgroundColor: '#E4E4E4', // Color de fondo del encabezado
    },
    page: {
        marginTop: 10,
        flexDirection: 'row',
        // backgroundColor: '#E4E4E4',
        height: '100%',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        // border: 1,
        // borderColor: "black",
        marginBottom: 20,
    },
    column: {
        width: '50%',
        padding: 5,
    },
    subtitle: {
        fontSize: 14,
        color: "#252ff5",
        textTransform: "capitalize"
    },
    textBold: {
        fontSize: 11,
        color: "#000",
        marginBottom: 5,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 11,
        color: "#000",
        marginBottom: 5,
    },
    list: {
        marginLeft: 10,
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

export default function PDF({ data, setting }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>

                    <View style={{ flexDirection: 'row', borderBottom: 1, borderColor: '#6b6969', }}>
                        <View style={styles.column}>
                            {/* <Image src={`${setting.logo}`} alt={data.main} /> */}
                        </View>
                        <View style={styles.column}>
                            {/* <Text style={styles.footer}>Agente: {data.user.name}, Email: {data.user.email}, Teléfono: {data.user.phone}</Text> */}
                        </View>

                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.section}>
                        <Image src={`${data.main}`} alt={data.main} />
                        <Text style={styles.subtitle}>{data.name}</Text>
                        <Text style={styles.text}>Dirección: {data.country.name}, {data.state.name}, {data.city.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <View style={styles.column}>
                                <Image src={`${data.main}`} alt={data.main} />
                            </View> */}
                            <View style={styles.column}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textBold}>Código:</Text>
                                    <Text style={styles.text}>{data.identification}</Text>
                                </View>
                                <Text style={styles.text}>Tipo de propiedad: {data.typeproperty.name}</Text>
                                <Text style={styles.text}>Metros totales: {data.totalMeters} mt2</Text>
                                <Text style={styles.text}>Metros construidos: {data.builtMeters} mt2</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>Baños: {data.bathrooms}</Text>
                                <Text style={styles.text}>Habitaciones: {data.bedrooms}</Text>
                                <Text style={styles.text}>Garage: {data.garages}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>Precio: {data.price}</Text>
                            </View>
                        </View>

                        {/* <Text style={styles.text}>{data.description}</Text> */}

                        <Text style={styles.subtitle}>Comodidades:</Text>
                        <View style={styles.list}>
                            {data.amenities.map((amenity, index) => (
                                <Text key={index} style={styles.text}>• {amenity.name}</Text> // Agrega un símbolo de viñeta
                            ))}
                        </View>

                        {/* <View style={styles.footer}> */}
                        {/* <Text style={styles.subtitle}>Datos del agente</Text> */}
                        <Text style={styles.footer}>Agente: {data.user.name}, Email: {data.user.email}, Teléfono: {data.user.phone}</Text>
                        {/* <Text style={styles.footer}>Email: {data.user.email}</Text>
                    <Text style={styles.footer}>Teléfono: {data.user.phone}</Text> */}
                        {/* </View> */}
                    </View>
                </View>
                {/* <Text style={styles.footer} render={({pageNumber, totalPages}) => 
                    `${pageNumber}/${totalPages}`
                } fixed /> */}
            </Page>
        </Document>
    );
}