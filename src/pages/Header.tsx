import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import Account from './Account/Account';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { SidebarMenuButton } from '../components/ui/sidebar';
import { ChevronUp, User2 } from 'lucide-react';


import { useTheme } from 'next-themes'

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


  return (
    <div className='flex justify-end m-2'>
      <div className='flex gap-2'>
        <Account></Account>
        {/* <ThemeChanger></ThemeChanger> */}
      </div>
    </div>
  )
}

export default Header