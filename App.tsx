import AppNavigator from './routes/app.navigator';
import { AuthProvider } from './auth/use.auth';

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    )
}
