import { createStackNavigator } from '@react-navigation/stack';
import Bem_Vindo from './pages/index';
import Acesso from './pages/entrada';
import Cadastre_se from './pages/cadastro';
import AfterLoginPage from './pages/posLogin';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                options={{ headerShown: false }}
                name="index"
                component={Bem_Vindo}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="entrada"
                component={Acesso}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="cadastro"
                component={Cadastre_se}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="posLogin"
                component={AfterLoginPage}
            />
        </Stack.Navigator>
    )
} 