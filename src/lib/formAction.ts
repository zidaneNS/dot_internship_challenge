import { redirect } from "next/navigation";
import { LoginFormSchema } from "./definition";
import { LoginFormState } from "./type";
import { useLocalStorage } from "./utils";

export const login = (state: LoginFormState, formData: FormData) => {
    const validatedField = LoginFormSchema.safeParse({
        user: formData.get('user')
    });

    if (!validatedField.success) {
        return { errors: validatedField.error.flatten().fieldErrors }
    }

    const { user } = validatedField.data;

    const { setLocalStorage } = useLocalStorage('user');

    setLocalStorage(JSON.stringify(user));

    redirect('/quiz');
}