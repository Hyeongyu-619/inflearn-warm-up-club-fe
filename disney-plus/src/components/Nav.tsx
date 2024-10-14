import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isProfileOpened, setIsProfileOpened] = useState(false);
  const navigate = useNavigate();

  const profilePictureUrl = localStorage.getItem("profilePictureUrl");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchValue(e.target.value);
    !e.target.value
      ? navigate("/main")
      : navigate(`/search?q=${e.target.value}`);
  };

  const signIn = useGoogleLogin({
    onSuccess: async (res) => {
      // Google API를 통해 사용자 정보 요청
      const userInfoRes = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${res.access_token}`,
          },
        }
      );
      const userInfo = await userInfoRes.json();
      // 사용자 정보에서 프로필 사진 URL 추출
      const profilePictureUrl = userInfo.picture;
      localStorage.setItem("profilePictureUrl", profilePictureUrl);
      navigate("/main");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signOut = () => {
    localStorage.removeItem("profilePictureUrl");
    navigate("/");
  };

  return (
    <nav
      className={`bg-${
        isScrolled ? "[#040714]" : "transparent"
      } p-4 px-6 fixed w-full flex justify-between items-center transition-all duration-200 h-20 z-10`}
    >
      <Link to={"/"}>
        <img src="/image/logo.svg" alt="logo" width={80} />
      </Link>
      {profilePictureUrl ? (
        <>
          <input
            type="text"
            value={searchValue}
            onChange={handleChange}
            className="px-2 rounded outline-none bg-black bg-opacity-50 text-white border focus:border-white border-gray-600"
            placeholder="영화를 검색해주세요."
          />
          <div className="relative">
            {isProfileOpened && (
              <button
                onClick={signOut}
                className="text-white border p-2 px-4 rounded absolute -left-[120px] top-2/4 -translate-y-1/2"
              >
                LOGOUT
              </button>
            )}
            <button onClick={() => setIsProfileOpened((prev) => !prev)}>
              <img
                src={profilePictureUrl}
                alt="profilePictureUrl"
                width={50}
                height={50}
                className="rounded-full"
              />
            </button>
          </div>
        </>
      ) : (
        <button
          className="text-white border p-2 px-4 rounded"
          onClick={() => signIn()}
        >
          LOGIN
        </button>
      )}
    </nav>
  );
};

export default Nav;
