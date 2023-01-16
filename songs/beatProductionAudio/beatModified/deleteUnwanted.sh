folders=("dirtyDishesBeats" "floorplanBeats" "habstrackBeats" "honeysuckleBeats" "lettuceBeats" "softSandBeats" "eclecticBeats")

for folder in ${folders[@]}; 
  do currentFile=$folder;
  echo "Processing " $folder
  cd $folder
  files=$(ls)
  for file in ${files[@]}; do
    if [[ "$file" =~ .*"down".* ]]; then
      rm $file
    fi
  done
  cd ..
  echo "\n"
done
