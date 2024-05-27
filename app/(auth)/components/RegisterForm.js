import '../tailwind.css'
import Link from "next/link"

export default function RegisterForm(){
    return (
        <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-xl font-bold my-4'>Registro</h1>
        <form className='flex flex-col gap-3'>
            <input type='text' placeholder='Nombre completo'/>
            <input type='text' placeholder='Email'/>
            <input type='password' placeholder='Contraseña'/>
            <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'>
                Registrarse
            </button>

            <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                Mensaje de error
            </div>

            <Link className='text-sm mt-3 text-right' href={'/login'}>
                Ya tienes una cuenta? <span className='underline'>
                    Inicia sesión
                </span>
            </Link>

        </form>
        </div>
    </div>
    )
}