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
    if (!data) return null;

    const mainImageUrl = data.media && data.media.length > 0 ? data.media[0].original_url : null;

    return (
        <Document title={`Propiedad - ${data.name || 'Sin nombre'}`}>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#6b6969', paddingBottom: 5 }}>
                        <View style={styles.column}>
                            {setting?.logo ? (
                                <Image src={setting.logo} style={{ width: 100 }} />
                            ) : (
                                <View />
                            )}
                        </View>
                        <View style={styles.column}>
                             <Text style={{ fontSize: 10, textAlign: 'right' }}>Agente: {String(data.user?.name || 'N/A')}</Text>
                             <Text style={{ fontSize: 10, textAlign: 'right' }}>Email: {String(data.user?.email || 'N/A')}</Text>
                             <Text style={{ fontSize: 10, textAlign: 'right' }}>Teléfono: {String(data.user?.phone || 'N/A')}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 60, padding: 20 }}>
                    <View style={styles.section}>
                        {mainImageUrl ? (
                            <Image src={mainImageUrl} style={{ marginBottom: 15 }} />
                        ) : (
                            <Text style={styles.text}>No hay imagen disponible</Text>
                        )}

                        <Text style={styles.subtitle}>{String(data.name || 'Propiedad sin nombre')}</Text>
                        <Text style={styles.text}>Dirección: {String(data.country?.name || 'N/A')}, {String(data.state?.name || 'N/A')}, {String(data.city?.name || 'N/A')}</Text>
                        
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={styles.column}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textBold}>Código: </Text>
                                    <Text style={styles.text}>{String(data.identification || 'N/A')}</Text>
                                </View>
                                <Text style={styles.text}>Tipo: {String(data.typeproperty?.name || 'N/A')}</Text>
                                <Text style={styles.text}>Metros totales: {String(data.totalMeters || '0')} mt2</Text>
                                <Text style={styles.text}>Metros constr.: {String(data.builtMeters || '0')} mt2</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>Baños: {String(data.bathrooms || '0')}</Text>
                                <Text style={styles.text}>Habitaciones: {String(data.bedrooms || '0')}</Text>
                                <Text style={styles.text}>Garage: {String(data.garages || '0')}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>Precio: {String(data.price || 'Consultar')}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.subtitle}>Comodidades:</Text>
                            <View style={styles.list}>
                                {(data.amenities || []).map((amenity, index) => (
                                    <Text key={`amenity-${index}`} style={styles.text}>• {String(amenity.name)}</Text>
                                ))}
                                {(!data.amenities || data.amenities.length === 0) && (
                                    <Text style={styles.text}>No se especificaron comodidades.</Text>
                                )}
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.subtitle}>Galería:</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {(data.media || []).map((mediaItem, index) => (
                                    <Image
                                        key={`media-${index}`}
                                        src={mediaItem.original_url}
                                        style={{ width: '30%', height: 100, margin: 5, objectFit: 'cover' }}
                                    />
                                ))}
                            </View>
                        </View>

                        <Text style={styles.footer}>
                            Agente: {String(data.user?.name || 'N/A')} | Email: {String(data.user?.email || 'N/A')} | Teléfono: {String(data.user?.phone || 'N/A')}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}