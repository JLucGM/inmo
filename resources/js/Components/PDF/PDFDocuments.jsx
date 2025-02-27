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


export default function PDFDocuments({ data }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>

                    
                            <View >
                                <Text style={styles.text}>Nombre: {data.name}</Text>
                                <Text style={styles.text}>Contacto: {data.contact?.name || 'N/A'}</Text>
                                <Text style={styles.text}>Agente: {data.user?.name || 'N/A'}</Text>
                                <Text style={styles.text}>Propiedad: {data.property?.name || 'N/A'}</Text>
                                <Text style={styles.text}>Estado: {data.status}</Text>

                            </View>
                        
                </View>
                {/* <Text style={styles.footer} render={({pageNumber, totalPages}) => 
                    `${pageNumber}/${totalPages}`
                } fixed /> */}
            </Page>
        </Document>
    );
}