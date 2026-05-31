import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Suspense, lazy } from 'react';
import PageLoader from './Components/PageLoader';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const page = pages[`./Pages/${name}.jsx`];
        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }
        return lazy(() => page().then(m => ({ default: m.default })));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        function AppWithSuspense() {
            const name = props.initialPage.component;

            let variant = 'authenticated';
            if (name.startsWith('Frontend/')) {
                variant = 'frontend';
            } else if (name.startsWith('Auth/') || name === 'Welcome') {
                variant = 'guest';
            }

            return (
                <Suspense fallback={<PageLoader variant={variant} />}>
                    <App {...props} key={name} />
                </Suspense>
            );
        }

        root.render(<AppWithSuspense />);
    },
    progress: {
        color: '#4B5563',
    },
});
