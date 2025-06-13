'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

export default function useAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('gwsToken='))
          ?.split('=')[1];
          

        if (!token) {
          console.log('No token found');
          router.replace('/sign-in');
          return;
        }

        // Decode user token (optional), or validate via backend
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getuserById`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = res.data?.user;

        if (!user) {
          console.warn('Invalid user. Redirecting...');
          router.replace('/sign-in');
        }

        // Optional: Add role-based checks here
        const host = window.location.host;
        if (
          (host === 'partner.gws365.in' || host === 'localhost:3004') &&
          user?.is_user_partner !== 'true'
        ) {
          alert('Access denied. You are not a partner.');
          router.replace('/partner/register');
        }

      } catch (err) {
        console.error('Auth error:', err);
        router.replace('/sign-in');
      }
    };

    checkAuth();
  }, [pathname]);
}
