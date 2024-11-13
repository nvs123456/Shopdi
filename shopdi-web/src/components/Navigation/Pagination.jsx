import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function PaginationButton() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    return (
        <Pagination
            page={page}
            count={10}
            renderItem={(item) => (
                <PaginationItem
                    component={"a"}
                    href={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                    sx={{
                        color: 'black', // Màu của văn bản
                        border: '1px solid #E4E7E9', // Màu viền
                        width: '48px', // Tăng kích thước chiều rộng
                        height: '48px', // Tăng kích thước chiều cao
                        borderRadius: '50%', // Bo tròn
                        '&.Mui-selected': {
                            backgroundColor: '#FA8232', // Màu nền khi được chọn
                            color: '#FFFFFF', // Màu của văn bản khi được chọn
                        },
                    }}
                    slots={{
                        previous: (props) => (

                            <ArrowBackIcon
                                sx={{color: '#FF5722', fontSize: '1.5rem'}} // Change color of left arrow
                            />
                        ),
                        next: (props) => (
                            <ArrowForwardIcon
                                sx={{color: '#FF5722', fontSize: '1.5rem'}} // Change color of right arrow
                            />
                        ),
                    }}
                />
            )}
        />
    );
}

export default PaginationButton;
