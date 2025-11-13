export const LOGO="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
export const UserIcon="https://occ-0-6502-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
export const BackgroundImg="https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_small.jpg"

export const API_OPTIONS={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer " +process.env.REACT_APP_TMDB_KEY
  },
};

export const IMG_CDN_URL="https://image.tmdb.org/t/p/w154"

export const SUPPORTED_LANGUAGES=[
  {identifier:"en",name:"English"},
  {identifier:"hindi",name:"हिन्दी"},
  {identifier:"spanish",name:"Español"},
]
