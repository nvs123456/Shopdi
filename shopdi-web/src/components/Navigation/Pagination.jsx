import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function PaginationButton({pageObject}) {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    // console.log(pageObject.totalPage)
    return (
        <Pagination
            page={pageObject?.pageNo+1 || 1}
            count={pageObject?.totalPage || 1}
            renderItem={(item) => (
                <PaginationItem
                    component={"a"}
                    href={`${location.pathname}?pageNo=${item.page-1}`}
                    {...item}
                    sx={{
                        color: 'black', // Màu của văn bản
                        borderRadius: 100,
                        border: '1px solid #E4E7E9', // Màu viền
                        fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '20px' }, // Responsive font size
                        width: { xs: '20px', sm: '25px', md: '30px', lg: '35px', xl: '40px' }, // Responsive width
                        height: { xs: '20px', sm: '25px', md: '30px', lg: '35px', xl: '40px' }, // Responsive height
                        marginBottom: '30px', // Thêm margin bottom

                        '&.Mui-selected': {
                            backgroundColor: '#FA8232', // Màu nền khi được chọn
                            color: '#FFFFFF', // Màu của văn bản khi được chọn
                        },
                    }}
                    slots={{
                        previous: (props) => (

                            <ArrowBackIcon
                                sx={{color: '#FF5722', fontSize: '1rem'}} // Change color of left arrow
                            />
                        ),
                        next: (props) => (
                            <ArrowForwardIcon
                                sx={{color: '#FF5722', fontSize: '1rem'}} // Change color of right arrow
                            />
                        ),
                    }}
                />
            )}
        />
    );
}

export default PaginationButton;
