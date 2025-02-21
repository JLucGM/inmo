const customStyles = {
    control: (base, { isFocused }) => ({
        ...base,
        borderRadius: '30px',
        backgroundColor: isFocused ? 'gray-500' : 'gray-200', // Cambia el fondo del control
        borderColor: isFocused ? 'gray-500' : 'gray-200', // Cambia el borde del control
        '&:hover': {
            borderColor: 'gray-500', // Cambia el borde del control al pasar el mouse
        },
        '&.dark': {
            backgroundColor: 'gray-700', // Cambia el fondo del control en dark mode
            borderColor: 'gray-700', // Cambia el borde del control en dark mode
        },
    }),
    option: (base, { isSelected, hover }) => ({
        ...base,
        backgroundColor: isSelected ? '#F7F7F7' : 'white', // Cambia el fondo de la opción seleccionada
        color: isSelected ? 'black' : 'black', // Cambia el color de la opción seleccionada
        '&.dark': {
            backgroundColor: isSelected ? 'gray-700' : 'gray-900', // Cambia el fondo de la opción seleccionada en dark mode
            color: isSelected ? 'white' : 'gray-300', // Cambia el color de la opción seleccionada en dark mode
        },
    }),
};

export default customStyles;