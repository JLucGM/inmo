import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

export default function ContainerTitle({ className = '', title, children, ...props }) {
    return (
        <Card {...props}>
            {title && (
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium capitalize">{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent className={className}>
                {children}
            </CardContent>
        </Card>
    );
}
