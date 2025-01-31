import styles from './homeInfo.module.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { siteName, siteDescription } from '../layout';
import { Stack } from '@mui/material';
import IconGroup, { IIconGroup } from './iconGroup';
import { ApprovalOutlined, SavingsOutlined, ShowChartOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export default function HomeInfo({ onAuthRequest } : { onAuthRequest: () => void }) {
    const Icons: Array<IIconGroup> = [
        {
            icon: ShowChartOutlined,
            colour: '#e024c6'
        },
        {
            icon: SavingsOutlined,
            colour: '#968806'
        },
        {
            icon: ApprovalOutlined,
            colour: '#db334b'
        },
    ];

    return (
        <div
            className={styles.wrapper}
        >
            <Stack direction="column" spacing={6} alignItems="center">
                <div>
                    <h1 className={[inter.className, styles.title].join(' ')}>{siteName}</h1>
                    <h2 className={[inter.className, styles.description].join(' ')}>{siteDescription}</h2>
                </div>
                <IconGroup Icons={Icons} />
                <Button onClick={onAuthRequest} variant="outlined">Sign In</Button>
            </Stack>
        </div>
    )
}