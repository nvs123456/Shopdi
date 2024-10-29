import {Grid, Typography} from '@mui/material'
import React from 'react'
import UETLogo from '/src/assets/images/UETLogo.png'
import MITLogo from '/src/assets/images/MITLogo.png'

const Footer = () => {
    return (
        <div>
            <Grid className='bg-[#3F81E0] text-white font-sans text-center mt-10 py-2 justify-top'
                  container
                  justifyContent='space-evenly'
                  alignItems='center'

            >
                <div className='mt-2 ml-28' >
                    <Typography className='pb-5' fontWeight={"bold"} marginTop={0} variant='h6'>About</Typography>
                    <Typography align='left' >Shopdi aims to promote innovation in the digital<br/>
                        commerce ecosystem by providing a platform for<br/>
                        startups and entrepreneurs to develop new services<br/>
                        and solutions, also supports digital commerce <br/>
                        including online payments, e-commerce, and <br/>
                        financial services.
                    </Typography>
                    <div className='flex justify-between mt-5 w-1/3 '>
                        <svg width="50" height="50" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M30.1218 14.9726C30.1218 6.87429 23.5657 0.301758 15.4877 0.301758C7.40961 0.301758 0.853516 6.87429 0.853516 14.9726C0.853516 22.0733 5.88766 27.9856 12.5608 29.35V19.3738H9.634V14.9726H12.5608V11.3049C12.5608 8.47341 14.8584 6.17009 17.6828 6.17009H21.3413V10.5713H18.4145C17.6096 10.5713 16.9511 11.2315 16.9511 12.0384V14.9726H21.3413V19.3738H16.9511V29.5701C24.3413 28.8365 30.1218 22.5867 30.1218 14.9726Z"
                                fill="white"/>
                        </svg>

                        <svg width="50" height="50" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.40989 0.936035C4.47151 0.936035 0.466797 4.6677 0.466797 9.26937V22.6027C0.466797 27.2044 4.47151 30.936 9.40989 30.936H23.7188C28.6572 30.936 32.6619 27.2044 32.6619 22.6027V9.26937C32.6619 4.6677 28.6572 0.936035 23.7188 0.936035H9.40989ZM27.2961 4.26937C28.2834 4.26937 29.0847 5.01603 29.0847 5.93603C29.0847 6.85603 28.2834 7.6027 27.2961 7.6027C26.3087 7.6027 25.5074 6.85603 25.5074 5.93603C25.5074 5.01603 26.3087 4.26937 27.2961 4.26937ZM16.5644 7.6027C21.5027 7.6027 25.5074 11.3344 25.5074 15.936C25.5074 20.5377 21.5027 24.2694 16.5644 24.2694C11.626 24.2694 7.62127 20.5377 7.62127 15.936C7.62127 11.3344 11.626 7.6027 16.5644 7.6027ZM16.5644 10.936C15.1412 10.936 13.7764 11.4628 12.7701 12.4005C11.7638 13.3382 11.1985 14.61 11.1985 15.936C11.1985 17.2621 11.7638 18.5339 12.7701 19.4716C13.7764 20.4093 15.1412 20.936 16.5644 20.936C17.9875 20.936 19.3523 20.4093 20.3586 19.4716C21.3649 18.5339 21.9302 17.2621 21.9302 15.936C21.9302 14.61 21.3649 13.3382 20.3586 12.4005C19.3523 11.4628 17.9875 10.936 16.5644 10.936Z"
                                fill="white"/>
                        </svg>
                        <svg width="50" height="50" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M31.4703 0.765137C30.2432 1.52735 27.7812 2.56612 26.3339 2.86574C26.2914 2.87726 26.2568 2.89208 26.2159 2.9036C24.9369 1.58332 23.1844 0.765137 21.2446 0.765137C17.3353 0.765137 14.1654 4.08231 14.1654 8.17321C14.1654 8.38887 14.1481 8.78561 14.1654 8.99633C8.89053 8.99633 4.8758 6.10553 1.9969 2.41138C1.68384 3.23449 1.54697 4.53502 1.54697 5.75653C1.54697 8.06291 3.26959 10.3281 5.95185 11.7324C5.45787 11.8657 4.91356 11.9612 4.34721 11.9612C3.4332 11.9612 2.4657 11.7093 1.58001 10.9455C1.58001 10.9735 1.58001 10.9998 1.58001 11.0294C1.58001 14.2528 4.84906 16.4472 7.75628 17.058C7.16634 17.4218 5.97702 17.458 5.39652 17.458C4.98749 17.458 3.54018 17.2621 3.15318 17.1864C3.96179 19.8286 6.87845 21.3135 9.65824 21.3662C7.48412 23.1507 5.97545 23.8125 1.52337 23.8125H0.00683594C2.81967 25.6991 6.40178 27.1066 9.99175 27.1066C21.6804 27.1066 28.3239 17.784 28.3239 8.99633C28.3239 8.85475 28.3208 8.55843 28.316 8.26046C28.316 8.23083 28.3239 8.20284 28.3239 8.17321C28.3239 8.12876 28.3113 8.08596 28.3113 8.04151C28.3066 7.81762 28.3019 7.60855 28.2972 7.4999C29.54 6.56154 30.6176 5.39107 31.4703 4.05761C30.3297 4.5877 29.1058 4.94329 27.8205 5.10462C29.1325 4.2815 30.9967 2.31919 31.4703 0.765137Z"
                                fill="white"/>
                        </svg>
                    </div>
                </div>
                <Grid item xs={12} sm={true} md={true} marginLeft={"600px"} align='left' >
                    <Typography className='pb-5' fontWeight={"bold"} marginTop={0} variant='h6'>Page</Typography>
                    <div className='pb-5'>
                        <a className='text-lg'>About us</a>
                    </div>
                    <div className='pb-5'>
                        <a className='text-lg'>Return Policy</a>
                    </div>
                    <div className='pb-5'>
                        <a className='text-lg'>Contact Us</a>
                    </div>
                    <div className='pb-5'>
                        <a className='text-lg'>Contact Refund & Cancellation Policies</a>
                    </div>
                </Grid>
                <Grid item xs={12} sm={true} md={true} align={'left'} marginLeft={'600px'}>
                    <Typography className='pb-6' fontWeight={"bold"} marginTop={0} variant='h6'>Shopdi</Typography>
                    <div>
                        <Typography className='pb-3' variant='body1'>About Shopdi</Typography>
                    </div>
                    <div>
                        <Typography className='pb-3' variant='body1'>Sell on Shopdi</Typography>
                    </div>
                    <div>
                        <Typography className='pb-3' variant='body1'>Shopdi Components</Typography>
                    </div>
                    <div>
                        <Typography className='pb-3' variant='body1'>Shopdi Debugger</Typography>
                    </div>
                    <div>
                        <Typography className='pb-3' variant='body1'>TSP For Shopdi</Typography>
                    </div>
                </Grid>

            </Grid>
            <Grid container item xs={12}
                  className="flex flex-row justify-evenly items-center bg-darkGray text-white py-5">
                <div className='flex flex-row space-x-5'>
                    <img src={UETLogo} alt='UET Logo' style={{width: '40px', height: '40px'}}/>
                    <img src={MITLogo} alt='MIT Logo' style={{width: '110px', height: '40px'}}/>
                </div>
                <Typography variant='body2' sx={{fontWeight: 'bold', fontSize: 'small'}}>Term & condition || Privacy
                    Policy</Typography>
                <Typography variant='body1' sx={{fontWeight: 'bold', fontSize: 'small'}}>® 2024 TNHH WebWizards company.
                    All rights reserved</Typography>
            </Grid>
        </div>
    )
}

export default Footer