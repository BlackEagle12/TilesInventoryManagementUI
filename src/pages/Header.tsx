import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import Account from './Account/Account';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { SidebarMenuButton } from '../components/ui/sidebar';
import { ChevronUp, User2 } from 'lucide-react';


import { useTheme } from 'next-themes'
import EditAccount from './Account/EditAccount';

// const ThemeChanger = () => {
//   const { theme, setTheme } = useTheme()

//   return (
//     <div>
//       The current theme is: {theme}
//       <Button onClick={() => setTheme('light')}>Light Mode</Button>
//       <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
//     </div>
//   )
// }

const Header = () => {


  const navigate=useNavigate();

  return (
    <div className='flex justify-end m-2'>
      <div className='flex gap-2'>
        <EditAccount ></EditAccount>
        {/* <ThemeChanger></ThemeChanger> */}
      </div>
    </div>
  )
}

export default Header