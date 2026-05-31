import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

export default function ContainerTitle({ className = '', title, subtitle, children, ...props }) {
    return (
        <Card {...props}>
            {title && (
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium capitalize">{title}</CardTitle>
                    {subtitle && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </CardHeader>
            )}
            {!title && subtitle && (
                <CardHeader className="pb-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {subtitle}
                    </p>
                </CardHeader>
            )}
            <CardContent className={className}>
                {children}
            </CardContent>
        </Card>
    );
}
