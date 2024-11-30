import { Toaster } from './components/ui/toaster'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './route'
import { useSelector } from 'react-redux';
import { useToast } from './hooks/use-toast';
import { useEffect } from 'react';
import { RootState } from './redux/reducer';

function App() {

  const notification= useSelector((state:RootState)=>state.commonAction.notification)

  const {toast} = useToast();
  
  console.log({notification});
  

  useEffect(()=>{
    if(notification && notification.message){
      toast({
        title:notification.message,
        variant:notification.type=="error" ? 'destructive' :notification.type=='success' ? "success" : ""
      })
    }
  },[notification])

  return (
    <>
        <RouterProvider router={createRouter()} />
        <Toaster />
    </>
  )
}

export default App
