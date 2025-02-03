import axios from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export const axiosApiClient = axios.create({
  baseURL: process.env.SERVER_URL,
});

type AppStore = Store<RootState>;
let store: AppStore;

export function injectStore(_store: AppStore) {
  store = _store;
}

axiosApiClient.interceptors.request.use((config) => {
  try {
    if (store) {
      config.headers['Authorization'] = store.getState().user.user?.token;
    }
  } catch {}

  return config;
});
