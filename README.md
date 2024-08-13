Keywords: React.js, Python, Flask, Recommendation system, JWT

# Movie Recommendation System

This project implements a Movie Recommendation System that serves users and their movie recommendations. 
It is built with Python using Flask + React.js, and it utilizes collaborative filtering and correlation-based 
recommendation algorithms.

## Overview

The core of the Movie Recommendation System lies in the application of collaborative filtering, 
a method of making automatic predictions (filtering) about the interests of a user by 
collecting preferences from many users (collaborating). 

The underlying assumption of the collaborative filtering approach is that if a user A has the same 
opinion as a user B on a set of items, A is likely to have B's opinion for a given item that A has 
not rated yet.

In this application, the collaborative filtering method is complemented by the use of **Spearman's rank 
correlation** coefficient for quantifying the statistical relationships between users' movie ratings.

## Concepts

## Collaborative Filtering

Collaborative filtering algorithms predict a user's interests by collecting preferences from many users. 
This technique assumes that if two users agree on one issue, 
they are likely to agree on others as well. In the context of this movie recommendation system, 
collaborative filtering is used to suggest movies that similar users have liked in the past.

## Correlation-Based Recommendation

In addition to collaborative filtering, this project uses a correlation-based recommendation system. 
Specifically, it employs the Spearman's rank correlation coefficient, 
a non-parametric measure of rank correlation. It assesses how well the relationship between 
two variables can be described using a monotonic function.

In the context of this system, it measures the strength and direction of the association between two 
users' rankings of movies they have both rated. The correlation coefficient ranges from -1 to 1. 
A value of 1 implies that a perfect increasing relationship exists between rankings, and a value of -1 
implies a perfect decreasing relationship. This is used as a weight when predicting a user's rating 
for a movie they haven't seen yet, based on the ratings given by users who have a high correlation 
coefficient with them.
