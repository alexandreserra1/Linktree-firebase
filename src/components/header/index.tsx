import {BiLogOut} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConection';

export function Header () {

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <header className=' w-full max-w-2xl mt-4 px-1'>
          <nav className='w-full bg-white h-12 flex items-center justify-between rounded-md px-3'>
            <div className='flex gap-4 font-semibold'>
                <Link to="/">
                    Home
                    </Link>
                    <Link to="/admin">
                    Links
                    </Link>
                    <Link to="/admin/social">
                    Redes sociais
                    </Link>
            </div>
            <button type="button" onClick={handleLogout} aria-label="Logout">
  <BiLogOut size={28} color='#d10c0f'/>
</button>

          </nav>
        </header>
    )
}