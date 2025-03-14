import { ApiError, LoginRequest } from "../types";

import axios from "axios";
import { loginApi } from "../api";
import { toast } from "sonner";
import { useAuthStore } from "../store";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useToastColors } from "./useToastColors";

export const useLogin = (shouldRedirect = true) => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const { getToastForType } = useToastColors();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: (data) => {
      login({ user: data.user, token: data.token });
      if (shouldRedirect) {
        if (location.key === "default") {
          navigate("/");
        } else {
          navigate(-1);
        }
      }
    },
    onError: (error: unknown) => {
      let messageError = "Error desconocido";
      if (axios.isAxiosError(error) && error.response) {
        const apiError = error.response.data as ApiError;
        messageError = apiError.message;
      }
      toast.error(messageError, {
        style: getToastForType("error"),
      });
    },
  });
};
