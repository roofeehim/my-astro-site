import { useEffect, useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/css';

export const Images = () => {

	const [images, setImages] = useState<[]>([]);

	const [value, setValue] = useState<string>("");

	useEffect(() => {
		axios
			.get(`https://api.unsplash.com/search/photos?query=${value}&client_id=Nd9AGcaEAcxY4AhlFlKy4eSFxgJT2aIi2TMoypKuiqk`)
			.then(res => {
				const filterImage: [] = res.data.results.filter((item) => {
					console.log(item.user.location)
					return item.user.location;
				})
				setImages(filterImage)
			})
	}, [value]);

	const handleFilterImages = (e) => {
		setValue(e.target.value);
	}

	const styles = {
		container: css`
      max-width:1200px;
			display:flex;
			flex-wrap:wrap;
    `,
		item: css`
			width:300px;
			margin:20px;
		`
	}

	return (
		<>
			<select value={value} onChange={handleFilterImages}>
				<option value='' disabled style={{ display: 'none' }}>slect city</option>
				<option value='New York'>New York</option>
				<option value='Tokyo'>Tokyo</option>
				<option value='London'>London</option>
				<option value='Berlin'>Berlin</option>
				<option value='Paris'>Paris</option>
				<option value='Beijing'>Beijing</option>
				<option value='Rome'>Rome</option>
				<option value='Vienna'>Vienna</option>
				<option value='Helsinki'>Helsinki</option>
			</select>
			{console.log(images)}
			{console.log(value)}
			<div className={styles.container}>
				{images.map((item: any, index) => (
					<div key={index}>
						<img className={styles.item} src={item.urls.regular} layout="fill" />
					</div>
				))}
			</div>
		</>
	)
};
