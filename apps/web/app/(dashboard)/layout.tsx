'use client';

import { Navbar } from '../components/layout/Navbar';
import { Sidebar, DRAWER_WIDTH } from '../components/layout/Sidebar';
import { Box, Toolbar } from '@mui/material';
import { useState } from 'react';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Sidebar - Large Desktop only (permanent on lg+) */}
            <Box
                component="nav"
                sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}
            >
                {/* Mobile/Tablet/Small Desktop drawer (xs, sm, md) */}
                <Sidebar
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                />
                {/* Large Desktop drawer (lg+) */}
                <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                    <Sidebar variant="permanent" open={true} onClose={() => { }} />
                </Box>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
                }}
            >
                <Navbar onMenuClick={handleDrawerToggle} />
                <Toolbar /> {/* Spacer for fixed navbar */}
                <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

