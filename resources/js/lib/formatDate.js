export function formatDate(dateStr) {
    if (!dateStr) return 'Indefinido';
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
}
