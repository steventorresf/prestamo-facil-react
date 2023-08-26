import logo from '../../../assets/imgs/logo.png';

const ImgLogo = ({ className = '', width, height }) => {
    return (
        <img className={className} src={logo} width={width} height={height} alt='logo' />
    )
}
export default ImgLogo;