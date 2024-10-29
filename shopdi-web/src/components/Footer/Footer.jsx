import {Grid, Typography} from '@mui/material'
import React from 'react'
import UETLogo from '/src/assets/images/UETLogo.png'
import MITLogo from '/src/assets/images/MITLogo.png'

const Footer = () => {
    return (
        <div>
            <Grid className='bg-cosmicLatte text-yaleBlue text-center'
                container
                justifyContent='space-evenly'
                alignItems='center'
            >
                <div className=''>
                    <Typography>Stay informed about Incart with our latest<br /> Update and ONDC news</Typography>
                    <button className='rounded-3xl border border-yaleBlue hover:bg-yaleBlue hover:text-cosmicLatte px-6 py-2 mt-2'>Enter email here for updates</button>
                </div>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className='pb-5' variant='h6' >Support</Typography>
                    <div>
                        <Typography className='pb-5' variant='body1' >123 Street, City, Country</Typography>
                    </div>
                    <div>
                        <Typography className='pb-5' variant='body1' >email@example.com</Typography>
                    </div>
                    <div>
                        <Typography className='pb-5' variant='body1' >+1234567890</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className=''>
                    <Typography className='pb-5' variant='h6' >Page</Typography>
                    <div className='pb-5' >
                        <a className='text-lg' >Claim</a>
                    </div>
                    <div className='pb-5'>
                        <a className='text-lg' >Privacy</a>
                    </div>
                    <div className='pb-5'>
                        <a className='text-lg' >Terms</a>
                    </div>
                </Grid>
            </Grid>
            <Grid container item xs={12} className="flex flex-row justify-evenly items-center bg-darkGray text-white py-5">
                <div className='flex flex-row space-x-5'>
                    <img src={UETLogo} alt='UET Logo' style={{ width: '40px', height: '40px' }} />
                    <img src={MITLogo} alt='MIT Logo' style={{ width: '110px', height: '40px' }}/>
                </div>
                <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: 'small' }}>Term & condition || Privacy Policy</Typography>
                <Typography variant='body1' sx={{ fontWeight: 'bold', fontSize: 'small' }}>® 2024 TNHH WebWizards company. All rights reserved</Typography>
            </Grid>
        </div>
    )
}

export default Footer