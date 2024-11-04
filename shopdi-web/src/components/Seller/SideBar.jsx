import { Link } from "react-router-dom";
export default function SideBar() {
    return (
        <div className="w-1/12 h-full bg-yaleBlue">
            <div className="w-full h-screen bg-yaleBlue">
                <div>

                </div>
                <div>
                    <Link to="products">
                        product
                    </Link>
                </div>
            </div>
        </div>
    )
}