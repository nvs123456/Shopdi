function SpinnerLoading ({size}) {
  return (
      <div className="flex items-center justify-center">
          <div className={` ${size === 2 ? 'w-8 h-8' : size === 1 ? 'w-4 h-4' : 'w-12 h-12'} border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin`}></div>
      </div>
  )
}

export default SpinnerLoading;